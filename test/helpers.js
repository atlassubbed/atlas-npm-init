const { exec, spawn } = require("child_process")
const { readFile, stat } = require("fs")
const { join } = require("path")
const { flatArgs } = require("./util")
const tmp = require("tmp")

// XXX currently node-tmp doesn't cleanup on CTRL+C, should be fixed soon
tmp.setGracefulCleanup()

const bin = join(__dirname, "../src/index.js")

const tempDir = cb => {
  tmp.dir({dir: __dirname, unsafeCleanup:true, keep: false}, (err, cwd) => {
    cb(err, bin, cwd)
  })
}

const build = (cwd, args, cb) => {
  exec(`node ${bin}${flatArgs(args)}`, {cwd}, err => cb(err, cwd))
}

const tempBuild = (args, cb) => {
  tmp.dir({dir: __dirname, unsafeCleanup:true, keep: false}, (err, cwd) => {
    err ? cb(err) : build(cwd, args, cb)
  })
}

const buildAndRead = (args, subpath, cb) => {
  tempBuild(args, (err, cwd) => {
    if (err) return cb(err);
    readFile(join(cwd, subpath), (err, data) => {
      cb(err, data && data.toString())
    })
  })
}

const buildAndCheck = (args, subpath, cb) => {
  tempBuild(args, (err, cwd) => {
    if (err) return cb(err);
    stat(join(cwd, subpath), cb)
  })
}

const buildAndRun = (args, cmd, cb) => {
  const n = args.n || "npm-package"
  tempBuild(args, (err, cwd) => {
    if (err) return cb(err);
    exec(cmd, {cwd: join(cwd, n)}, cb)
  })
}

module.exports = { tempDir, build, buildAndRead, buildAndCheck, buildAndRun }
