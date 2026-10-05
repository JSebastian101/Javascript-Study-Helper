import { useMemo } from 'react'
import { cx } from '../lib/accents'
import { highlight } from '../lib/highlight'

function Tokens({ code, terms }: { code: string; terms?: string[] }) {
  const tokens = useMemo(() => highlight(code, terms), [code, terms])
  return (
    <>
      {tokens.map((token, index) => (
        <span key={index} className={cx(`tok-${token.type}`, token.emphasis && 'tok-em')}>
          {token.text}
        </span>
      ))}
    </>
  )
}

export function CodeBlock({ code, terms, className }: { code: string; terms?: string[]; className?: string }) {
  return (
    <pre
      className={cx(
        'overflow-x-auto rounded-xl border border-line bg-code px-4 py-3.5 font-mono text-[13.5px] leading-[1.7] text-ink',
        className,
      )}
    >
      <code>
        <Tokens code={code} terms={terms} />
      </code>
    </pre>
  )
}

export function InlineCode({ code, className }: { code: string; className?: string }) {
  return (
    <code className={cx('font-mono text-[0.92em] whitespace-pre', className)}>
      <Tokens code={code} />
    </code>
  )
}
