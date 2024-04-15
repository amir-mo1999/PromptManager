from pydantic import BaseModel


class DecodedToken(BaseModel):
    """Decoded token model."""

    access_token: str
    token_type: str
    exp: int
    iat: int
    jti: str
    sub: str
