import fs from 'fs'
import { program } from 'commander'

program.option('-s, --src <src>', 'source path')
program.option('-d, --dst <dst>', 'destination path')
program.parse()

type ParameterType = {
  src?: string,
  dst?: string
}

const copy = ({src, dst}: ParameterType) => {
  if (!src || !dst) throw 'paramter needed'
  if (fs.existsSync(dst)) throw 'file exists'

  fs.copyFileSync(src, dst)
}
copy(program.opts<ParameterType>())
