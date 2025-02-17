
const { promisify } = require('util')
const redis = require('redis')

const createStore = () => redis.createClient(process.env.REDIS_URL)

const store = createStore()

// migrate(store)

const get = promisify(store.get).bind(store)
const set = promisify(store.set).bind(store)
const hset = promisify(store.hset).bind(store)
const hget = promisify(store.hget).bind(store)
const hgetall = promisify(store.hgetall).bind(store)
const del = promisify(store.del).bind(store)
const rpush = promisify(store.rpush).bind(store)
const lpush = promisify(store.lpush).bind(store)
const lrange = promisify(store.lrange).bind(store)
const llen = promisify(store.llen).bind(store)
const lindex = promisify(store.lindex).bind(store)

const sadd = promisify(store.sadd).bind(store)
const smembers = promisify(store.smembers).bind(store)
const srem = promisify(store.srem).bind(store)
const sismember = promisify(store.sismember).bind(store)

const zcard = promisify(store.zcard).bind(store)
const zadd = promisify(store.zadd).bind(store)
const zrange = promisify(store.zrange).bind(store)

const lrem = promisify(store.lrem).bind(store)

exports.hset = async (hash, key, value) => hset(hash, key, value)
exports.hget = async (hash, key) => hget(hash, key)
exports.hgetall = async (hash) => hgetall(hash)

exports.rpush = async (list, ...values) => rpush(list, ...values)
exports.lpush = async (list, ...values) => lpush(list, ...values)
exports.lrange = async (list, from, to) => lrange(list, from, to)
exports.llen = async (list) => llen(list)
exports.lindex = async (list, index) => lindex(list, index)
exports.lrem = async (list, index) => lrem(list, index)

exports.zcard = async (set) => zcard(set)
exports.zadd = async (set, score, item) => zadd(set, score, item)
exports.zrange = async (set, from, to) => zrange(set, from, to)

exports.sadd = async (key, ...members) => sadd(key, ...members)
exports.smembers = async (key) => smembers(key)
exports.srem = async (key, ...members) => srem(key, ...members)
exports.sismember = async (key, member) => sismember(key, member)

exports.set = async (key, value) => set(key, JSON.stringify(value))
exports.get = async (key) => get(key).then(value => JSON.parse(value))

exports.del = async (key) => {
  if (key instanceof Array) {
    return del(...key).then(value => value)
  } else {
    return del(key).then(value => value)
  }
}

exports.keys = require('./keys')
