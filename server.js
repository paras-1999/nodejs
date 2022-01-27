import fs from 'fs';
import http, { createServer } from 'http';
import { parse } from 'querystring';
const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url == '/') {
        let data = fs.readFileSync('home.html');
        let list = fs.readFileSync('emplist.txt').toString().split(`*`);
        let emplist = [];
        list.map(val =>
            emplist.push(JSON.parse(val))
        )
        let body = ''
        emplist.map(val =>
            body += `<tr><td>${val.name}</td><td>${val.email}</td><td>${val.phone}</td><td>${val.age}</td></tr>`
        )
        res.write(`${data} ${body}</tbody>
        </table>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </body>
  </html>`);
        res.end()
    }
    else if (req.method === 'GET' && req.url == '/form') {
        let data = fs.readFileSync('form.html');
        res.write(data);
        res.end()
    }
    else if (req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body = parse(data.toString());
            console.log(body)
            fs.appendFile('emplist.txt', `*${JSON.stringify(body)}`, (err) => { if (err) throw err; console.log(body) })
        });
        req.on('end', () => {
            res.writeHead(301, { "Location": "http://localhost:5000/" });
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // let data = fs.readFileSync('form.html');
            // res.write(data);
            res.end()
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });

        res.end(`<h1>404 ERROR could not find that Page</h1>`);
    }
});
server.listen(5000);
// if (req.method === 'GET' && req.url == '/') {
//     let data = fs.readFileSync('home.html');
//     let list = fs.readFileSync('emplist.txt');
//     let temp = list.toString();
//     let temp2 = temp.split("*");
//     let emplist = []
//     temp2.map(val =>
//         emplist.push(JSON.parse(val))
//     )
//     let body = ''
//     emplist.map(val =>
//         body += `<tr><td>${val.name}</td><td>${val.email}</td><td>${val.phone}</td><td>${val.age}</td></tr>`
//     )
//     res.write(`${data} ${body}</tbody>
//     </table>
//   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
// </body>
// </html>`);
//     res.end()
// }