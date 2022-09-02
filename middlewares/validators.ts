import { Request, Response, NextFunction } from "express";
import { validationResult, check } from 'express-validator';
import Role from "../models/role.model";

export const validFields = (req:Request, res:Response, next:NextFunction) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    next();
}
export const validRoles = async(role:string) => {
    const validRole = await Role.findByPk(role)
    if(!validRole){
      throw new Error("Rol no valido")
    }
  }
