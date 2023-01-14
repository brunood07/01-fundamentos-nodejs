import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // Não é impossível mas não é usual fazer stream de JSON
  // { "name": "Bruno", "email": "brunood07@gmail.com" }

  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334, () => {
  console.log("Server is listening on port 3334");
});
