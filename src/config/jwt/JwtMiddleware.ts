import { Service } from "typedi";
import { Request, Response } from "express";
import { UserRepository } from "../../modules/user/repository/UserRepository";
import { IRequestWithUserId } from "./IRequestWithUserId";
import { TokenManagement } from "./TokenManagement";

@Service()
export class JwtMiddleware {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptor: TokenManagement
  ) {}

  public verifyToken = async (
    req: IRequestWithUserId,
    res: Response,
    next: any
  ) => {
    try {
      const token = req.headers["authorization"]?.toString().split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token" });
      const id: string = this.encryptor.verifyToken(token as string);
      const user = await this.userRepository.getUserById(id);
      if (!user)
        return res.status(401).json({ message: "User does not exist" });
      req.userId = id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
