import { getIndex, path } from "./gunacc";

const index = getIndex();
//get msgs from gun
let diff = 1;
let Name = [],
  Message = [],
  CreatedAt = [],
  Type = [];

//load previous msgs
export const load = () => {
  let i = index - diff;
  let msg = [],
    nam = [],
    created = [],
    typ = [];
  path
    .get(i)
    .map()
    .once(function (data, key) {
      if (data !== undefined) {
        try {
          // data = JSON.parse(data);
          nam.push(data.name);
          msg.push(data.message);
          created.push(data.createdAt);
          typ.push(data.type);
        } catch (err) {
          console.log(err);
        }
      }
    });
  diff = diff + 1;
  Message = msg.concat(Message);
  Name = nam.concat(Name);
  CreatedAt = created.concat(CreatedAt);
  Type = typ.concat(Type);
};

export const scroll = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
    /* you can also use 'auto' behaviour 
         in place of 'smooth' */
  });
};
