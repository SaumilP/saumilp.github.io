+++
title = "Zola quickstart"
description = "Zola static site generator quickstart"
date = 2024-03-19
updated = 2024-03-23
draft = false

[taxonomies]
tags = ["zola", "static-site generator"]
categories = ["quickstarts"]

[extra]
disable_comments = false
+++

This post is one of the first one after a long time, I am evaluating **[`Zola`](https://www.getzola.org/)** as replacement of Jekyll, and thought of creating a blog for step-by-step site building.

Whether you like Rust and SSG or you do not know any of these, if you wish to create a website or a blog, `Zola` is made for you! We are going to discover here the basic concepts.<!-- more --> For more advanced options, please refer to the [documentation](https://www.getzola.org/documentation/).

<details closed>
<summary style="display:list-item"><b>Installation options</b></summary>

#### macOS
```bash
$ brew install zola
```
It is also available for installation on MacPorts:
```bash
$ sudo port install zola
```

#### Arch Linux

Zola is available in the official Arch Linux repositories.
```bash
$ pacman -S zola
```

#### Apline Linux

Zola is available in the official Alpine Linux community repository since Alpine v3.13.

See this section of the Alpine Wiki explaining how to enable the community repository if necessary: https://wiki.alpinelinux.org/wiki/Repositories#Enabling_the_community_repository.
```bash
$ apk add zola
```

#### Debian

Zola is available over at [barnumbirr/zola-debian](https://github.com/barnumbirr/zola-debian). Grab the latest `.deb` for your Debian version then simply run:
```bash
$ sudo dpkg -i zola_<version>_amd64_debian_<debian_version>.deb
```

#### Fedora

Zola is avaiable via COPR
```bash
$ sudo dnf copr enable fz0x1/zola
$ sudo dnf install zola
```

#### FreeBSD

Zola is available in the official package repository.
```bash
$ pkg install zola
```

#### Docker

Zola is available in docker registry. It has no `latest` tag, you will have to install with specific tag pull.
```bash
$ docker pull ghcr.io/getzola/zola:v0.17.1
```

##### Build
```bash
$ docker run -u "$(id -u):$(id -g)" -v $PWD:/app --workdir /app ghcr.io/getzola/zola:v0.17.1 build
```
You can now browse `http://localhost:8080`.
For live reload, use below command:
```bash
$ docker run -u "$(id -u):$(id -g)" -v $PWD:/app --workdir /app -p 8080:8080 -p 1024:1024 ghcr.io/getzola/zola:v0.17.1 serve --interface 0.0.0.0 --port 8080 --base-url localhost
```

##### Multi-stage build
```bash
FROM ghcr.io/getzola/zola:v0.17.1 as zola

COPY . /project
WORKDIR /project
RUN ["zola", "build"]
```

##### Serve
```bash
$ docker run -u "$(id -u):$(id -g)" -v $PWD:/app --workdir /app -p 8080:8080 ghcr.io/getzola/zola:v0.17.1 serve --interface 0.0.0.0 --port 8080 --base-url localhost
```

#### Windows

For windows users, some of the below indicated tools be useful to install zola:

Using [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):
```bash
$ winget install getzola.zola
```

Also it is available on [Chocolatey](https://chocolatey.org/):
```bash
$ choco install zola
```

and [Scoop](https://scoop.sh/):
```bash
$ scoop install zola
```
Unfortunately Zola installation isn't possible via Powershell ISE.

</details><br />

<details closed>
<summary style="display:list-item"><b>Check the Installation</b></summary>

To check if it's working:
```bash
$> zola --help
```

The help screen:
```
A fast static site generator with everything built-in

Usage: zola [OPTIONS] <COMMAND>

Commands:
  init        Create a new Zola project
  build       Deletes the output directory if there is one and builds the site
  serve       Serve the site. Rebuild and reload on change automatically
  check       Try to build the project without rendering it. Checks links
  completion  Generate shell completion
  help        Print this message or the help of the given subcommand(s)

Options:
  -r, --root <ROOT>      Directory to use as root of project [default: .]
  -c, --config <CONFIG>  Path to a config file other than config.toml in the root of project [default: config.toml]
  -h, --help             Print help
  -V, --version          Print version
```
</details><br />

### Post installation

Once you have installed Zola, create a site by entering the following in a terminal:
```bash
$ zola init quicksite
```
Answer the interactive question as follows in order to init the `config.toml` file:

```
Welcome to Zola!
> What is the URL of your site? (https://example.com): http://example.com
> Do you want to enable Sass compilation? [Y/n]: Y
> Do you want to enable syntax highlighting? [y/N]: N
> Do you want to build a search index of the content? [y/N]: N
```

10 milliseconds later, you should get a folder with the following architecture:
```bash
$ tree quicksite/
quicksite/
├── config.toml
├── content
├── sass
├── static
├── templates
├── public
└── themes
```
in this folder, lets enter:

```bash
$ zola serve
```
and look at [http://127.0.0.1:1111/](http://127.0.0.1:1111/) in our browser, and voila!

![Zola Welcome](/img/2024/intro-to-zola-ssg/zola_welcome.webp)

As mentioned, we can install a theme or create ourselves. <br /><br />

### Custimizing site with First theme

Creating a theme is somewhat easy as writing a site by hand. Moreover, it allows you to understand how zola works. If you are in a hurry, you can also install the theme of this tutorial and review it. A _default theme_ is planned by zola community, but is not yet available.

Lets create the `index.html` page in the `templates/` directory.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Zola quickstart</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>Hello world!</p>
</body>
</html>
```

If this page is opened in the browser, then it refreshes itself and we see our "Hello world!" message.

Rather than writing the site content directly into the theme, which is like a site-by-hand without Zola, we will use the template engine (_tera_ used by Zola) to fill the site with variables.

#### Site name

First, to be able to change the name of the site easily, lets add a variable into `[extra]` section of the `config.toml` file.

```toml
[extra]
# put all your custom site variables here
site_name = "Zola Quickstart"
```

Now, to use this variable, lets replace the `title` line in our `index.html`.

```html
<title>{{ config.extra.site_name || upper }}</title>
```
Here, we used the declared config variable and applied a filter to it. To read more about Tera, please check out the [documentation](https://keats.github.io/tera/).

#### Markdown content

It is always a good to be able to manage content independently of the theme whether you are managing a website or a blogsite. Part of this section, we will write content in [Markdown](https://daringfireball.net/projects/markdown/). First lets create a welcome text for our site in `_index.md` file in `content/` directory.

```markdown
+++
title = "Welcome, you"
description = "welcome message"
+++
Hello world!
```

and change the `index.html` file to handle this content,
```html
<body>
    <h1>{{ section.title }}</h1>
    <p>{{ section.content | safe }}</p>
</body>
```
Page reloads and you can see the content of the _index.md displayed via theme index.html file. Now, We have separated the theme and content. Please note, the name used for the markdown file and the name of the variable used to access the data.

#### Content Structure

If you look at the overview of the Zola, it can be simple to understand tree structure and its purpose.

```
.
└── content
    ├── _index.md             # https://example.com/
    ├── blog
    │   ├── _index.md			    # https://example.com/blog/
    │   ├── hello-world.md 		# https://example.com/blog/hello-world/
    │   ├── my-first-post.md 	# https://example.com/blog/my-first-post/
    │   └── zola-is-great.md	# https://example.com/blog/zola-is-great/
    │
    ├── wiki
    │   ├── _index.md			    # https://example.com/wiki/
    │   ├── how-to-build.md   # https://example.com/wiki/how-to-build/
    │   ├── deploy-advice.md  # https://example.com/wiki/deploy-advice/
    │   └── contrib-guide.md  # https://example.com/wiki/contrib-guide/
    │
    ├── about.md				      # https://example.com/about/
    ├── contact.md				    # https://example.com/contact/
    └── cv.md					        # https://example.com/cv/
```

All the `.md` files are "pages" except for the special file called `_index.md` - which contains "sections". These 2 objects just differ in the variables accepted in their header, the section in TOML format - is delimited by "+++" at the top of the file.

#### Page front-matter

For more details, please refer to [Zola documentation dedicated section](https://www.getzola.org/documentation/content/page/#front-matter):

Overall below mentioned fields to can be in page "section":

```
title = ""
description = ""
date =
weight = 0
draft = false
slug = ""
path = ""
aliases = []
in_search_index = true
template = "page.html"

[taxonomies]
tags = ["tag-1", "web"]

[extra]
```

#### Section front-matter

For more details, please refer to [Zola documentation dedicated section](https://www.getzola.org/documentation/content/section/#front-matter):

Some of the expected fields in section:

```
title = ""
description = ""
sort_by = "none"
weight = 0
template = "section.html"
page_template =
paginate_by = 0
paginate_path = "page"
insert_anchor_links = "none"
in_search_index = true
render = true
redirect_to = ""
transparent = false
aliases = []

[extra]
```

#### Expandable template

The interest of a template is to maximize code reuse. Let's discover how to use the basic features in a simple example.
```html
<!-- index.html -->
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8"/>
    <title>{{ config.extra.site_name | upper }}</title>
</head>
<body>
	{% include "nav.html" %}
	{% block content %}{% endblock content %}
</body>
</html>
```

Here We've discovered that the include tag which allows to include another template and the block tag which allows to declare a block which will be replaced by the templates which derive from it.

```html
<!-- nav.html -->
<nav>
  <ul>
    <li> <a href="{{ get _url(path="@/_index.md") }}"> Home </a> </li>
    <li> <a href="{{ get _url(path="@/contact.md") }}"> Contact </a> </li>
    <li> <a href="{{ get _url(path="@/about.md") }}"> About </a> </li>
  </ul>
</nav>
```

Here We've discovered that the `get _url` function which allows to obtain the URL of a page in the site, and the notation @/file which allows to make an internal link to a page of the site.

```
{% extends "index.html" %}

{% block content %}
  <h1>{{ page.title }}</h1>
  <p>{{ page.content | safe }}</p>
{% endblock content %}
```

Here We've discovered that the `extends' tag which allows to derive from an existing template to replace one or more blocks.

```html
<!-- section.html -->
{% extends "index.html" %}

{% block content %}
  <h1>{{ section.title }}</h1>
  <p>{{ section.content | safe }}</p>
  <p>Pages in section</p>
  <ul>
  {% for page in section.pages | reverse %}
      <li>
        <em> <a href="{{ page.permalink }}"> {{ page.title }} </a> </em>
        <span>{{ page.date | date(format="%Y-%m-%d") }}</span>
      </li>
  {% endfor %}
  </ul>

{% endblock content %}
```

Here We've discovered that the for tag which allows to make a loop in a list of elements and filters like date which can take arguments.

```markdown
# contact.md
+++
title = "contact"
date = 2024-03-18
+++
Contact me at ...
```

Here We've discovered that an additional metadata indicating the date of the page.

```markdown
# about.md
+++
title = "about"
date = 2019-09-25
+++

This site has been made with :

- Zola
- Sass
- TOML
```

Here We've discovered that a Markdown list will be rendered as an HTML list. <br /><br />

## A bit of colour

SASS is a kind of CSS without punctuation of type `{, ;` and a variable management. It is used by many css frameworks. If you don't want to use it, you can of course write css files directly and jump to the next section.

#### SASS

Lets enjoy a very nice feature of Zola: the Sass compilation. Lets add the line

```htm.j2
<link rel="stylesheet" href="{{ get _url(path="extra.css") }}"/>
```

in the head of our `index.html` and add the file `extra.sass` to the root of our sass folder.
```sass
$bg: #111
$cl: #0f0

nav ul li
  display: inline-block
  margin-left: 10px
  border: solid 1px #666

body
  color: $cl
  background-color: $bg

a
  color: #a5a
```

#### CSS

To add CSS to our theme, we just need to add this line

```htm.j2
<link rel="stylesheet" href="{{ get _url(path="extra.css") }}"/>
```

in the <head> of our `index.html` file and add the `extra.css` to the root of our `static/` directory.
```css
nav ul li{
  display: inline-block;
  margin-left: 10px;
  border: solid 1px #666;
}

body {
  color: #0f0;
  background-color: #111;
}

a{
  color: #a5a;
}
```
<br />

## For the future

In short, this post is to get you started on building your own Zola site - introducing to some of the key concepts. Hope you continue exploring Zola!
