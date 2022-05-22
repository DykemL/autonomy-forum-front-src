import { getDecodedJwt } from "../../Common/Helpers/JwtHelper";

export default function Test() {
  console.log(getDecodedJwt());
  return(
    <>
      Привет
    </>
  )
}