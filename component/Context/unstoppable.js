import UAuth from "@uauth/js";

import { useUserData } from "./useUserData";

export const uauth = new UAuth({
  clientID: "47e8a841-c58d-4a60-a273-861ff09f2860",
  redirectUri: "https://lounge-quilt.com/",
  scope: "openid wallet",
});

// for development
// export const uauth = new UAuth({
//   clientID: "840430ff-0986-4760-9662-1f30aa3a2f60",
//   redirectUri: "http://localhost:3000",
//   scope: "openid wallet email:optional",
// });

export const unstop = async () => {
  try {
    const authorization = await uauth.loginWithPopup();
    const domainName = authorization.idToken.sub;
    // const data = await uauth.user();

    // const environment = "staging";
    // const resp = await fetch(
    //   `
    //   https://resolve.unstoppabledomains.com/metadata/${domainName}
    //   `,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer aaa9e908-aa71-449c-bb6c-add5eb1e7c97",
    //     },
    //   }
    // );

    // const data = await resp.json();
    // console.log(resp);
    // setAvatar(
    //   `https://metadata.unstoppabledomains.com/image-src/${domainName}.svg`
    // );
    login(domainName);
  } catch (error) {
    console.error(error);
  }
};
