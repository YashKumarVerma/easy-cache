import { ConfigurationObject } from './interface'

import { mandatoryPropsExist } from '../util/mandatory'

/** class with constructor and methods */
export default class Core {
  /** constructor to initialize the package with a configuration object */
  constructor(config: ConfigurationObject) {
    /** check if all mandatory properties are set */
    const mandatoryProps = [
      'redisPort',
      'redisHost',
      'redisPassword',
      'defaultTTL',
      'debug',
    ]
    mandatoryPropsExist(config, mandatoryProps, 'initialize decorator')
  }
}
