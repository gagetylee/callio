import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";
import { ProfileService } from "./profile.service";

@Service()
export class ProfileController {
  constructor(readonly profileService: ProfileService) {
    this.search = this.search.bind(this)
  }

  public async search(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const searchData: ProfileSearchDto = req.body
      const profiles: Profile[] = await this.profileService.search(searchData)

      return res.status(200).json({
        success: true,
        message: 'Profiles found',
        data: profiles
      })
    } catch (error) {
      next(error)
    }
  }
}