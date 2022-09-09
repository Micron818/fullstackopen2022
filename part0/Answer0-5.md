Sequences when open https://studies.cs.helsinki.fi/exampleapp/spa

```
browser->server: https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML
browser->server: https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser-->server: https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js
note over browser:
browser executing main.js to request data
end note
browser-->server: https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"send dat","date":"2022-09-08T18:24:00.395Z"}...]

note over browser:
browser render 
end note
```
