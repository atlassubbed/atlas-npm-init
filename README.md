# atlas-npm-init

A CLI tool for generating npm projects and necessary boilerplate.

---

## install

```
npm install -g atlas-npm-init
```

## why

I wanted to get the hang of abstracting things into packages, and I found the boilerplate work to be excessive (even with `npm init`) and 99% the same in every case. To me, this screams "automate me". Now, I can just run `npm-init` and fill out some questions (or use args) and I can immediately get to writing my code.

This package will generate a project with `chai`, `mocha` and some minimal boilerplate installed.

## examples

### using the cli tool

#### with args

You can specify a name, description, and author. The name is required, the rest are optional:

```
npm-init -n my-app -d "my description" -a "atlassubbed <atlassubbed@gmail.com>"
```

#### without args

If you don't specify any args, you will be prompted to enter your name, description and author. In this case, all responses are optional. If you don't specify a name, it will default to "npm-package":

```
npm-init
```

#### speciying an author

If you specify a full author (with a name *and* email), the generator will automatically initialize a repository and perform an initial commit.

### the generated project

#### structure

```
  npm-package/
    src/
      index.js
    test/
      index.test.js
    .gitingore
    LICENSE.md
    README.md
    package.json
```

#### scripts

You'll be provided with two scripts to run your tests:

  1. `npm run test-server`: pretty mocha test output to CLI with hot-rerun.
  2. `npm test`: pretty mocha test output to CLI.

#### npm install

Once you've generated `my-app`, all you need to do is:

```
cd my-app
npm install
```

## todo

I'd like to have a global executable called `atlas` which has the following sub-commands:

  1. `npm`: generates a minimal npm starter app.
  2. `webpack`: generates a minimal webpack starter app.
  3. `repo`: automatically sync your project to github or fork/clone existing projects.
  4. `logout`
  5. `whoami`
  6. ~~`login`~~: Not needed, thanks to `atlas-recursive-auth`

As of right now, the `atlas` command only has subcommands 3 and 4 above. `atlas-npm-init` (this package) and `altas-webpack-init` are their own commands, but i'd like to turn them into 1 and 2 above, respectively. The `atlas` command should then be responsible for initializing pretty much everything in a new project.

## caveats

#### license

`LICENSE.md` defaults to Apache-2.0. Should I change this to MIT? Currently, there's no option to change it from the CLI. Changing it manually would simply require editing a line in `package.json` and editing the `LICENSE.md` file itself.

#### private

By default, packages will be private -- be sure to delete that line if you plan on publishing your generated package.

#### `sinon` and `sinon-chai`

When I was writing this package, I included `sinon` and `sinon-chai`, but I removed them because I found myself not using them in my tests. `sinon` is great, but why don't I use it? Spying, stubbing and mocking is pretty easy without it.

#### git initialization

Currently, the generator will automatically initialize a repo and make the first commit if you specify a full author. There's no way to turn this off right now. I understand that this can be undesirable, but I always needed this steps, so I figured it would just be a default.