const { join } = require("path");
const { exec } = require("child_process")
const { writeFile, readFile } = require("fs")

const updatePackage = (src, dest, n, d, a, cb) => {
  const pkg = require(join(src,"package.json"))
  pkg.name = n
  pkg.description = d
  pkg.author = a
  exec(`node -v && npm -v`, (err, val) => {
    if (err) return cb(err);
    val = val.split("\n")
    pkg.engines = {
      node: `^${val[0].slice(1)}`,
      npm: `^${val[1]}`
    }
    const newPkg = `${JSON.stringify(pkg, null, 2)}\n`
    writeFile(join(dest, "package.json"), newPkg, cb)
  })
}

const updateLicense = (dest, n, a, cb) => {
  const loc = join(dest, "LICENSE.md")
  // race condition here is ok for this use case
  readFile(loc, (err, data) => {
    if (err) return cb(err);
    const year = new Date().getFullYear()
    data = data.toString().replace("[year]", year)
    if (a) data = data.replace("[author]", a)
    writeFile(loc, data, cb)
  })
}

const travisBadge = "[![Travis](https://img.shields.io/travis/[username]/[repo].svg)](https://travis-ci.org/[username]/[repo])"

const updateReadme = (dest, n, d, cb) => {
  // initial few lines of README.md
  const lines = [`# ${n}`, d, travisBadge, "---"].filter(l => !!l)
  writeFile(join(dest, "README.md"), `${lines.join("\n\n")}\n`, cb)
}

const updateIndex = (dest, n, cb) => {
  writeFile(join(dest, "src", "index.js"), `console.log("Hello from ${n}!")\n`, cb)
}

const createGitIgnore = (dest, cb) => {
  writeFile(join(dest, ".gitignore"), `node_modules/\nnpm-debug.log\n.DS_Store\n`, cb)
}

module.exports = { updatePackage, updateLicense, updateReadme, updateIndex, createGitIgnore }
