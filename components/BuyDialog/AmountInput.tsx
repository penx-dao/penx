'use client'

import { PropsWithChildren, useState } from 'react'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { matchNumber } from '@/lib/utils'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function AmountInput({ value, onChange }: Props) {
  const [index, setIndex] = useState('1')
  return (
    <div className="relative">
      <Input
        size="lg"
        autoFocus
        placeholder="0.0"
        value={value}
        onChange={(e) => {
          let value = e.target.value
          if ((e.nativeEvent as any)?.data === '。') {
            value = value.replace('。', '.')
          }
          if (!matchNumber(value, 1) && value.length) {
            if (/^\.\d+$/.test(value)) {
              onChange?.('0' + value)
              e.preventDefault()
            }

            return
          }
          setIndex('0')
          onChange(value)
        }}
        className="w-full"
      />

      <div className="flex items-center justify-center absolute right-0 top-0 h-full px-3">
        <ToggleGroup
          size="sm"
          value={index}
          onValueChange={(v) => {
            if (!v) return
            if (v === '1') onChange('1')
            if (v === '2') onChange('5')
            if (v === '3') onChange('10')
            console.log('vlllllllllll:', v)

            setIndex(v)
          }}
          type="single"
        >
          <ToggleItem value="1">1</ToggleItem>
          <ToggleItem value="2">5</ToggleItem>
          <ToggleItem value="3">10</ToggleItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

function ToggleItem({ value, children }: PropsWithChildren<{ value: string }>) {
  return (
    <ToggleGroupItem
      value={value}
      className="h-8 w-12 bg-accent text-xs hover:bg-neutral-200 data-[state=on]:bg-black data-[state=on]:text-white rounded-full font-semibold"
    >
      {children}
    </ToggleGroupItem>
  )
}
