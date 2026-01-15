from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

# =========================
# JWT CONFIG
# =========================
SECRET_KEY = "supersecretkey"  # pindahkan ke .env saat production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# =========================
# PASSWORD HASHING (ARGON2)
# =========================
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def hash_password(password: str) -> str:
    """
    Hash plain password menggunakan Argon2
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifikasi password
    """
    return pwd_context.verify(plain_password, hashed_password)

# =========================
# JWT TOKEN
# =========================
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Membuat JWT access token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
