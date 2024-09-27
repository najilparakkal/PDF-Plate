import { Pdf } from "../../framworks/pdf";
import { Users } from "../../framworks/users";
import { IUserDetails } from "../entities/Interfaces";

export default {
  signUp: async (userData: IUserDetails, password: string) => {
    try {
      const findUser = await Users.find({email:userData.email});
      if (findUser.length === 0) {
        const newUser = await Users.create({
          email: userData.email,
          userName: userData.userName,
          password: password,
        });
        console.log(newUser)
        return {success:true,newUser};
      }else{
        return {success:false,message:"user already exists"};
      }
    } catch (error) {
      console.log(error);
    }
  },
  signIn:async(email:string)=>{
    try {
        return await Users.findOne({email})
    } catch (error) {
        console.log(error)
    }
  },
  upload:async(email:string,data:string)=>{
    try {
        const uploadPdf = await Pdf.create({
          userEmail: email,
          pdf: data,
        })
        return {success:true,uploadPdf};
    } catch (error) {
        console.log(error)
    }
  },
  history:async(email:string)=>{
    try {
      return await Pdf.find({userEmail:email})
    } catch (error) {
      console.log(error)
    }
  }
};
