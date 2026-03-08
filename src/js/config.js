/**
 * MockAddress Core 配置模块
 * 允许用户自定义数据路径和其他设置，不影响正式站点
 */

// 默认配置（用于正式站点 mockaddress.com）
const defaultConfig = {
  // 数据文件基础路径
  // 如果用户想用自己的数据，可以设置为 'my-data/' 或 '/custom/path/data/'
  dataBasePath: null, // null 表示使用自动路径检测（正式站点行为）
  
  // 是否启用自动路径检测（针对多语言目录结构）
  // 如果设为 false，则只使用 dataBasePath
  autoDetectPaths: true,
  
  // 自定义数据加载器（可选）
  // 如果提供，将优先使用此函数加载数据，而不是默认的 fetch
  customDataLoader: null
};

// 用户配置（会被 merge 到默认配置）
let userConfig = {};

/**
 * 初始化配置
 * @param {Object} config - 用户配置对象
 * @example
 * MockAddressCore.config({
 *   dataBasePath: 'my-data/',
 *   autoDetectPaths: false
 * });
 */
export function configure(config = {}) {
  userConfig = { ...defaultConfig, ...config };
}

/**
 * 获取当前配置
 */
export function getConfig() {
  return { ...defaultConfig, ...userConfig };
}

/**
 * 重置配置为默认值
 */
export function resetConfig() {
  userConfig = {};
}
