from app.services.auth import get_password_hash, verify_password


def test_password_hash_can_be_verified():
    password = "test-password"
    hashed_password = get_password_hash(password)

    assert hashed_password.startswith("$2b$")
    assert verify_password(password, hashed_password)
    assert not verify_password("incorrect-password", hashed_password)


def test_verify_password_accepts_existing_passlib_bcrypt_hash():
    hashed_password = "$2b$12$VoxThaZKW6Gltp.c.F44n.QS8Vfvs2EjoSqLMadxWKAhULlA2LonS"

    assert verify_password("password", hashed_password)
