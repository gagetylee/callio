import { UserRequest } from "@/util/auth.interface";
import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { ProfileCreateDto } from "./dto/profileCreate.dto";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";
import { ProfileService } from "./profile.service";

@Service()
export class ProfileController {
  constructor(readonly profileService: ProfileService) {
    this.findOne = this.findOne.bind(this)
    this.search = this.search.bind(this)
    this.update = this.update.bind(this)
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const profile: Profile = await this.profileService.findOne(req.params.username)

      return res.status(200).json({
        success: true,
        message: "User found",
        data: profile
      })
    } catch (error) {
      next(error)
    }
  }


  public async search(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // const searchData: ProfileSearchDto = req.body

      const searchData = req.body
      const searchQuery = req.query.search

      const profiles: Profile[] = await this.profileService.search({...searchData, search: searchQuery})

      return res.status(200).json({
        success: true,
        message: 'Profiles found',
        data: profiles
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Private: true
   * @param req 
   * @param res 
   * @param next 
   */
  public async update(req: UserRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const updateData: ProfileCreateDto = req.body
      const updatedProfile: Profile = await this.profileService.update(req.user.id, updateData)

      return res.status(200).json({
        success: true,
        message: 'Profile successfully updated',
        data: updatedProfile
      })
    } catch (error) {
      next(error)
    }
  }
}