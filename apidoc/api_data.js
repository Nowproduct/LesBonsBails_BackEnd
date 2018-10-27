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
            "field": "email",
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>It should be a string.</p>"
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
    "type": "get",
    "url": "/example/:id",
    "title": "",
    "group": "Example",
    "permission": [
      {
        "name": "public"
      }
    ],
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/example/-id.js",
    "groupTitle": "Example",
    "name": "GetExampleId"
  },
  {
    "type": "post",
    "url": "/example",
    "title": "",
    "group": "Example",
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
            "description": "<p>It should be a string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>It should be a string.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/example.js",
    "groupTitle": "Example",
    "name": "PostExample"
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
  },
  {
    "type": "post",
    "url": "/user/connect",
    "title": "",
    "group": "User",
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
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/user/connect.js",
    "groupTitle": "User",
    "name": "PostUserConnect"
  },
  {
    "type": "post",
    "url": "/user/registration",
    "title": "",
    "group": "User",
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
    "filename": "C:/Users/nowpr/Projects/LesBonsBails_BackEnd/node_modules/koa-smart/dist/ApiDocTmp/user/registration.js",
    "groupTitle": "User",
    "name": "PostUserRegistration"
  }
] });
