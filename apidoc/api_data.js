define({ "api": [
  {
    "type": "post",
    "url": "/connect",
    "title": "",
    "group": "Connect",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>It should be a string with that matches with /\\S+@\\S+.\\S+/.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>It should be a string.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/connect.js",
    "groupTitle": "Connect",
    "name": "PostConnect"
  },
  {
    "type": "get",
    "url": "/",
    "title": "",
    "group": "Index",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/Index.js",
    "groupTitle": "Index",
    "name": "Get"
  },
  {
    "type": "post",
    "url": "/registration",
    "title": "",
    "group": "Registration",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>It should be a string with that matches with /\\S+@\\S+.\\S+/.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>It should be a string.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/registration.js",
    "groupTitle": "Registration",
    "name": "PostRegistration"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "",
    "group": "User",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/user/-id.js",
    "groupTitle": "User",
    "name": "GetUserId"
  }
] });
