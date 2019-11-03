'use strict'

const Poller = require('./poller')

class PollerFactory {
  /**
   * Create daemon.
   * @param {Object} backends - Backends for fetching secret properties.
   * @param {Object} kubeClient - Client for interacting with kubernetes cluster.
   * @param {Object} metrics
   * @param {Object} customResourceManifest
   * @param {Object} logger - Logger for logging stuff.
   * @param {number} pollerIntervalMilliseconds - Interval time in milliseconds for polling secret properties.
   */
  constructor ({
    backends,
    kubeClient,
    metrics,
    pollerIntervalMilliseconds,
    customResourceManifest,
    logger
  }) {
    this._logger = logger
    this._metrics = metrics
    this._backends = backends
    this._kubeClient = kubeClient
    this._pollerIntervalMilliseconds = pollerIntervalMilliseconds
    this._customResourceManifest = customResourceManifest
  }

  createPoller (descriptor) {
    const poller = new Poller({
      backends: this._backends,
      intervalMilliseconds: this._pollerIntervalMilliseconds,
      kubeClient: this._kubeClient,
      logger: this._logger,
      metrics: this._metrics,
      customResourceManifest: this._customResourceManifest,
      externalSecret: descriptor.externalSecret
    })

    return poller
  }
}

module.exports = PollerFactory