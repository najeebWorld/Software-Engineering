# News

## 3.2.5 - 2021-04-05 {#version-3-2-5}

### Improvements

- Add more validations to XPath parser.

- `require "rexml/docuemnt"` by default.
  [GitHub#36][patch by koichi ito]

- Don't add `#dcloe` method to core classes globally.
  [GitHub#37][patch by akira matsuda]

- Add more documentations.
  [Patch by Burdette Lamar]

- Added `REXML::Elements#parent`.
  [GitHub#52][patch by burdette lamar]

### Fixes

- Fixed a bug that `REXML::DocType#clone` doesn't copy external ID
  information.

- Fixed round-trip vulnerability bugs.
  See also: https://www.ruby-lang.org/en/news/2021/04/05/xml-round-trip-vulnerability-in-rexml-cve-2021-28965/
  [HackerOne#1104077][cve-2021-28965][Reported by Juho Nurminen]

### Thanks

- Koichi ITO

- Akira Matsuda

- Burdette Lamar

- Juho Nurminen

## 3.2.4 - 2020-01-31 {#version-3-2-4}

### Improvements

- Don't use `taint` with Ruby 2.7 or later.
  [GitHub#21][patch by jeremy evans]

### Fixes

- Fixed a `elsif` typo.
  [GitHub#22][patch by nobuyoshi nakada]

### Thanks

- Jeremy Evans

- Nobuyoshi Nakada

## 3.2.3 - 2019-10-12 {#version-3-2-3}

### Fixes

- Fixed a bug that `REXML::XMLDecl#close` doesn't copy `@writethis`.
  [GitHub#20][patch by hirura]

### Thanks

- hirura

## 3.2.2 - 2019-06-03 {#version-3-2-2}

### Fixes

- xpath: Fixed a bug for equality and relational expressions.
  [GitHub#17][reported by mirko budszuhn]

- xpath: Fixed `boolean()` implementation.

- xpath: Fixed `local_name()` with nonexistent node.

- xpath: Fixed `number()` implementation with node set.
  [GitHub#18][reported by mirko budszuhn]

### Thanks

- Mirko Budszuhn

## 3.2.1 - 2019-05-04 {#version-3-2-1}

### Improvements

- Improved error message.
  [GitHub#12][patch by fuji goro]

- Improved error message.
  [GitHub#16][patch by ujihisa]

- Improved documentation markup.
  [GitHub#14][patch by alyssa ross]

### Fixes

- Fixed a bug that `nil` variable value raises an unexpected exception.
  [GitHub#13][patch by alyssa ross]

### Thanks

- FUJI Goro

- Alyssa Ross

- ujihisa

## 3.2.0 - 2019-01-01 {#version-3-2-0}

### Fixes

- Fixed a bug that no namespace attribute isn't matched with prefix.

  [ruby-list:50731][reported by yasuhiro kimura]

- Fixed a bug that the default namespace is applied to attribute names.

  NOTE: It's a backward incompatible change. If your program has any
  problem with this change, please report it. We may revert this fix.

  - `REXML::Attribute#prefix` returns `""` for no namespace attribute.

  - `REXML::Attribute#namespace` returns `""` for no namespace attribute.

### Thanks

- Yasuhiro KIMURA

## 3.1.9 - 2018-12-20 {#version-3-1-9}

### Improvements

- Improved backward compatibility.

  Restored `REXML::Parsers::BaseParser::UNQME_STR` because it's used
  by kramdown.

## 3.1.8 - 2018-12-20 {#version-3-1-8}

### Improvements

- Added support for customizing quote character in prologue.
  [GitHub#8][bug #9367][Reported by Takashi Oguma]

  - You can use `"` as quote character by specifying `:quote` to
    `REXML::Document#context[:prologue_quote]`.

  - You can use `'` as quote character by specifying `:apostrophe`
    to `REXML::Document#context[:prologue_quote]`.

- Added processing instruction target check. The target must not nil.
  [GitHub#7][reported by ariel zelivansky]

- Added name check for element and attribute.
  [GitHub#7][reported by ariel zelivansky]

- Stopped to use `Exception`.
  [GitHub#9][patch by jean boussier]

### Fixes

- Fixed a bug that `REXML::Text#clone` escapes value twice.
  [ruby-dev:50626][bug #15058][Reported by Ryosuke Nanba]

### Thanks

- Takashi Oguma

- Ariel Zelivansky

- Jean Boussier

- Ryosuke Nanba
