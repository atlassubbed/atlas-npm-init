const getLicense = (year, author) => `Copyright ${year} ${author}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.\n`

const getGitIgnore = () => `node_modules/
npm-debug.log
.DS_Store
`
const promptMessages = [
  "Enter npm package name",
  "Enter npm package description",
  "Enter npm package author"
]

const getTravisBadge = () => `[![Travis](https://img.shields.io/travis/[username]/[repo].svg)](https://travis-ci.org/[username]/[repo])`

const getPrompt = index => promptMessages[index]

module.exports = { getLicense, getPrompt, getGitIgnore, getTravisBadge }
