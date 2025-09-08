import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { UniqueId } from "../value-objects/uniqueIdValueObject";

type SignAccessPayload = {
  sub: string; // userId
  jti?: string; // id do token (opcional, vamos sempre gerar)
  email: string;
};

type SignRefreshPayload = {
  sub: string;
  email: string;
};

export class JwtService {
  private readonly secret = process.env.JWT_SECRET!;
  private readonly issuer = process.env.JWT_ISSUER || "flowgest";
  private readonly audience = process.env.JWT_AUDIENCE || "flowgest-app";
  private readonly accessExp = process.env.JWT_ACCESS_EXPIRES || "2h";
  private readonly refreshExpDays = Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 7);

  signAccessToken(payload: SignAccessPayload): { token: string; jti: string; exp: number } {
    const jti = payload.jti ?? new UniqueId().getValue();
    const expSeconds = Math.floor(Date.now() / 1000) + this.hoursToSeconds(this.accessExp);

const token = jwt.sign(
    { ...payload },
    this.secret,
    {
      jwtid: jti,
      issuer: this.issuer,
      audience: this.audience,
      expiresIn: this.accessExp as any,
    }
  );

  return { token, jti, exp: expSeconds };
  }

  signRefreshToken(payload: SignRefreshPayload): { token: string; exp: Date } {
    const expiresAt = new Date(Date.now() + this.refreshExpDays * 24 * 60 * 60 * 1000);

    const token = jwt.sign(
    { ...payload, type: "refresh" }, // já contém "sub"
    this.secret,
    {
      issuer: this.issuer,
      audience: this.audience,
      expiresIn: `${this.refreshExpDays}d` as any,
    }
  );

  return { token, exp: expiresAt };
  }

  verify(token: string) {
    return jwt.verify(token, this.secret, {
      issuer: this.issuer,
      audience: this.audience,
    }) as JwtPayload;
  }

  private hoursToSeconds(exp: string): number {
    // suporta "2h", "120m", "7200" (segundos)
    if (/^\d+$/.test(exp)) return Number(exp);
    if (exp.endsWith("h")) return Number(exp.replace("h", "")) * 3600;
    if (exp.endsWith("m")) return Number(exp.replace("m", "")) * 60;
    // fallback 2h
    return 2 * 3600;
  }
}
