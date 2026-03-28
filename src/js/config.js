/**
 * MockAddress Core 配置模块
 * 数据文件路径仅通过 dataFiles 映射解析，默认使用中性文件名（不暴露生产环境命名）。
 */

/** 默认数据文件相对路径（可全部被 configure({ dataFiles: { ... } }) 覆盖） */
const defaultDataFiles = {
  usRegions: 'data/addr-regions-us.json',
  names: 'data/names-pool.json',
  hkRegions: 'data/addr-regions-hk.json',
  ukRegions: 'data/addr-regions-uk.json',
  caRegions: 'data/addr-regions-ca.json',
  jpRegions: 'data/addr-regions-jp.json',
  jpNames: 'data/names-pool-jp.json',
  inRegions: 'data/addr-regions-in.json',
  twRegions: 'data/addr-regions-tw.json',
  sgRegions: 'data/addr-regions-sg.json',
  deRegions: 'data/addr-regions-de.json',
  taxfreePreviewPack: 'data/tf-preview.pack.json',
  macOui: 'data/oui-registry.json',
};

const defaultConfig = {
  dataBasePath: null,
  autoDetectPaths: true,
  customDataLoader: null,
  dataFiles: { ...defaultDataFiles },
};

let userConfig = {};

/**
 * @param {string} id - dataFiles 键，如 'usRegions'、'names'
 * @returns {string} 传给 loadData / fetch 的相对路径
 */
export function getDataFilePath(id) {
  const map = {
    ...defaultDataFiles,
    ...(userConfig.dataFiles || {}),
  };
  const p = map[id];
  if (!p || typeof p !== 'string') {
    throw new Error(`Unknown dataFiles key: "${id}"`);
  }
  return p;
}

/**
 * @param {Object} config - 用户配置对象
 * @example
 * configure({
 *   dataBasePath: 'my-data/',
 *   autoDetectPaths: false,
 *   dataFiles: { usRegions: 'internal/secret-name.json' }
 * });
 */
export function configure(config = {}) {
  const { dataFiles, ...rest } = config;
  userConfig = { ...userConfig, ...rest };
  if (dataFiles && typeof dataFiles === 'object') {
    userConfig.dataFiles = {
      ...(userConfig.dataFiles || {}),
      ...dataFiles,
    };
  }
}

export function getConfig() {
  return {
    ...defaultConfig,
    ...userConfig,
    dataFiles: {
      ...defaultDataFiles,
      ...(userConfig.dataFiles || {}),
    },
  };
}

export function resetConfig() {
  userConfig = {};
}
