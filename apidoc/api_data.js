define({ "api": [
  {
    "type": "get",
    "url": "/articles/:id",
    "title": "",
    "group": "Articles",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/articles/-id.js",
    "groupTitle": "Articles",
    "name": "GetArticlesId"
  },
  {
    "type": "post",
    "url": "/articles",
    "title": "",
    "group": "Articles",
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
            "field": "name",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "pictureurl",
            "description": "<p>It should be an array.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/articles.js",
    "groupTitle": "Articles",
    "name": "PostArticles"
  },
  {
    "type": "post",
    "url": "/articles/recent",
    "title": "",
    "group": "Articles",
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
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>It should be a number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>It should be a number.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/articles/recent.js",
    "groupTitle": "Articles",
    "name": "PostArticlesRecent"
  },
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
    "type": "put",
    "url": "/me/profile",
    "title": "",
    "group": "Me",
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
            "optional": true,
            "field": "email",
            "description": "<p>It should be a string with that matches with /\\S+@\\S+.\\S+/.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": "<p>It should be a string.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/me/profile.js",
    "groupTitle": "Me",
    "name": "PutMeProfile"
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
            "field": "firstname",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastname",
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
