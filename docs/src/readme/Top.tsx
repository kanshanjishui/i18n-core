import { Image, Link, Break } from 'jsx-to-md'
import { linkObj, imageObj, langs } from '../constants'

const separator = ' | '

function renderLanguage() {
  const res = langs.reduce((res, item, index) => {
    const { code, locale, name } = item

    if (global.docLocale == code) {
      res.push(name)
    } else {
      res.push(
        <Link href={`./README${code != 'en' ? '_' + locale : ''}.md`}>
          {name}
        </Link>,
      )
    }

    if (index != langs.length - 1) {
      res.push(separator)
    }

    return res
  }, [])
  return (
    <>
      <Break />
      <Break />
      {res}
      <Break />
      <Break />
    </>
  )
}

export default function Top() {
  const props = {
    align: 'center',
  }

  return (
    <div {...props}>
      <Break />
      <Link {...linkObj['github']}>
        <Image {...imageObj['logo']} />
      </Link>
      <Break />
      {renderLanguage()}
      <p style={{ fontSize: 18 }}>
        {tr('适用于 JavaScript 的轻量、简单、灵活、自动翻译的国际化工具')}
      </p>
      <Break />
      <Break />
      <Link {...linkObj['npm']}>
        <Image {...imageObj['npm-version']} />
      </Link>
      <Break />
      <Link {...linkObj.npm}>
        <Image {...imageObj['npm-download']} />
      </Link>
      <Break />
      <Break />
      <Link {...linkObj['github-stars']}>
        <Image {...imageObj['github-stars']} />
      </Link>
      <Break />
      <Link {...linkObj['last-commit']}>
        <Image {...imageObj['last-commit']} />
      </Link>
      <Break />
      <Link {...linkObj['github-issues']}>
        <Image {...imageObj['github-issues']} />
      </Link>
      <Break />
      <Link {...linkObj.codecov}>
        <Image {...imageObj.codecov} />
      </Link>
      <Break />
    </div>
  )
}
