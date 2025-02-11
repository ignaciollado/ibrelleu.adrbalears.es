// To parse this data:
//
//   import { Convert } from "./file";
//
//   const contactDTO = Convert.toContactDTO(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ContactDTO {
  id:                           number;
  firstName:                    string;
  lastName:                     string;
  dni:                          string;
  dob:                          Date;
  nationality:                  string;
  technical_profile:            null;
  contact_status:               string;
  userProfile:                  string;
  gender:                       string;
  state_reason:                 null;
  consultant:                   null;
  acceptTerms:                  number;
  delegation:                   null;
  phone_prefix:                 null;
  mainPhone:                    string;
  mainMail:                     string;
  secondary_phone:              null;
  secondary_email:              null;
  professional_phone:           null;
  contact_comments:             null;
  preferred_contact_time:       null;
  twitter:                      null;
  linkedin:                     null;
  facebook:                     null;
  localizationAddress:          string;
  zipCode:                      string;
  town:                         string;
  council:                      string;
  island:                       string;
  province:                     null;
  localizationCCAA:             null;
  country:                      string;
  web_registration:             number;
  job_status:                   null;
  education_level:              null;
  bank_entity:                  null;
  self_employed:                null;
  business_management_training: null;
  training_type:                null;
  experience_areas:             null;
  created_at:                   Date;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toContactDTO(json: string): ContactDTO[] {
      return cast(JSON.parse(json), a(r("ContactDTO")));
  }

  public static contactDTOToJson(value: ContactDTO[]): string {
      return JSON.stringify(uncast(value, a(r("ContactDTO"))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
      if (typ.length === 2 && typ[0] === undefined) {
          return `an optional ${prettyTypeName(typ[1])}`;
      } else {
          return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
      }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
      return typ.literal;
  } else {
      return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue(l("Date"), val, key, parent);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue(l(ref || "object"), val, key, parent);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps, key, ref);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps, key, ref);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
      ref = typ.ref;
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "ContactDTO": o([
      { json: "id", js: "id", typ: 0 },
      { json: "firstName", js: "firstName", typ: "" },
      { json: "lastName", js: "lastName", typ: "" },
      { json: "dni", js: "dni", typ: "" },
      { json: "dob", js: "dob", typ: Date },
      { json: "nationality", js: "nationality", typ: "" },
      { json: "technical_profile", js: "technical_profile", typ: null },
      { json: "contact_status", js: "contact_status", typ: "" },
      { json: "userProfile", js: "userProfile", typ: "" },
      { json: "gender", js: "gender", typ: "" },
      { json: "state_reason", js: "state_reason", typ: null },
      { json: "consultant", js: "consultant", typ: null },
      { json: "acceptTerms", js: "acceptTerms", typ: 0 },
      { json: "delegation", js: "delegation", typ: null },
      { json: "phone_prefix", js: "phone_prefix", typ: null },
      { json: "mainPhone", js: "mainPhone", typ: "" },
      { json: "mainMail", js: "mainMail", typ: "" },
      { json: "secondary_phone", js: "secondary_phone", typ: null },
      { json: "secondary_email", js: "secondary_email", typ: null },
      { json: "professional_phone", js: "professional_phone", typ: null },
      { json: "contact_comments", js: "contact_comments", typ: null },
      { json: "preferred_contact_time", js: "preferred_contact_time", typ: null },
      { json: "twitter", js: "twitter", typ: null },
      { json: "linkedin", js: "linkedin", typ: null },
      { json: "facebook", js: "facebook", typ: null },
      { json: "localizationAddress", js: "localizationAddress", typ: "" },
      { json: "zipCode", js: "zipCode", typ: "" },
      { json: "town", js: "town", typ: "" },
      { json: "council", js: "council", typ: "" },
      { json: "island", js: "island", typ: 0 },
      { json: "province", js: "province", typ: null },
      { json: "localizationCCAA", js: "localizationCCAA", typ: null },
      { json: "country", js: "country", typ: "" },
      { json: "web_registration", js: "web_registration", typ: 0 },
      { json: "job_status", js: "job_status", typ: null },
      { json: "education_level", js: "education_level", typ: null },
      { json: "bank_entity", js: "bank_entity", typ: null },
      { json: "self_employed", js: "self_employed", typ: null },
      { json: "business_management_training", js: "business_management_training", typ: null },
      { json: "training_type", js: "training_type", typ: null },
      { json: "experience_areas", js: "experience_areas", typ: null },
      { json: "created_at", js: "created_at", typ: Date },
  ], false),
};


export const contactColumns = [
  {
    key: 'name',
    type: 'url',
    label: 'Nom complet',
  },
  {
    key: 'nif',
    type: 'readOnly',
    label: 'DNI/NIE',
  },
  {
    key: 'mainEmail',
    type: 'email',
    label: 'Correu electrònic principal',
  },
  {
    key: 'mainPhone',
    type: 'text',
    label: 'Telèfon principal',
  },
  {
    key: 'profile',
    type: 'text',
    label: 'Perfil',
  },
  {
    key: 'state',
    type: 'text',
    label: 'Estat contacte',
  },
  {
    key: 'registrationDate',
    type: 'date',
    label: "Data d'entrada",
  },
  {
    key: 'consultant',
    type: 'text',
    label: 'Consultor',
  },
  {
    key: 'delegation',
    type: 'scope',
    label: 'Delegació',
  },
  {
    key: 'town',
    type: 'text',
    label: 'Població',
  },
  {
    key: 'employementStatus',
    type: 'text',
    label: 'Situació laboral',
  },
  // {
  //   key: "isEdit",
  //   type: "isEdit",
  //   label: ""
  // },
];

export const contactColumnsBBDD = [
  {
    key: 'firstName',
    type: 'url',
    label: 'Nom complet',
  },

  {
    key: 'dni',
    type: 'readOnly',
    label: 'DNI/NIE',
  },
  {
    key: 'mainMail',
    type: 'email',
    label: 'Correu electrònic principal',
  },
  {
    key: 'mainPhone',
    type: 'text',
    label: 'Telèfon principal',
  },
  {
    key: 'userProfile',
    type: 'userProfile',
    label: 'Perfil',
  },
  {
    key: 'contact_status',
    type: 'contactStatus',
    label: 'Estat contacte',
  },
  {
    key: 'created_at',
    type: 'date',
    label: "Data d'entrada",
  },
  {
    key: 'consultant',
    type: 'text',
    label: 'Consultor',
  },
  {
    key: 'delegation',
    type: 'scope',
    label: 'Delegació',
  },
  {
    key: 'town',
    type: 'text',
    label: 'Població',
  },
  {
    key: 'employementStatus',
    type: 'text',
    label: 'Situació laboral',
  }
];
