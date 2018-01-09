import fs from 'fs'

import { main } from '../src/main'

const userParams = {
  resumeDir: `${__dirname}/resume/old`, 
  rootPath: '/downloads',
  newRootPath: '/new-downloads',
  rewrite: false,
  newResumeDir: `${__dirname}/resume/new`
}

describe('main()', () => {
  it('should do things', () => {
    expect(() => main(userParams)).not.toThrow()
    const newFileData = fs.readFileSync(
      `${userParams.newResumeDir}/test.resume`
    ).toString()
    console.log(newFileData)
  })
})