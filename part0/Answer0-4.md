Sequence code:
```
browser->server: https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: Status Ccode: 302,location: /exampleapp/notes
browser->server: https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: status Code: 200
browser-->server: https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser-->server: https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js
note over browser:
browser executing main.js to request data
end note
browser-->server: https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"hello request","date":"2022-09-08T18:15:49.432Z"},...]

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [...{"content":"test","date":"2022-09-09T03:12:40.920Z"}]

note over browser:
browser render notes
end note
```
