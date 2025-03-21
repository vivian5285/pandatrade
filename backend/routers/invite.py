import qrcode
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from io import BytesIO
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/invite", tags=["invite"])

# 用户邀请链接模型
class InviteLinkRequest(BaseModel):
    user_id: int

# 生成唯一邀请链接
@router.post("/generate-link")
def generate_invite_link(request: InviteLinkRequest):
    base_url = "https://pandatrade.com/register"
    invite_link = f"{base_url}?ref={request.user_id}"
    return {"invite_link": invite_link}

# 生成邀请二维码
@router.get("/generate-qr/{user_id}")
def generate_invite_qr(user_id: int):
    base_url = "https://pandatrade.com/register"
    invite_link = f"{base_url}?ref={user_id}"
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(invite_link)
    qr.make(fit=True)

    img = qr.make_image(fill="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return StreamingResponse(buffer, media_type="image/png")
