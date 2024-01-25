class HashSet {
  constructor (initialCapacity, loadFactor) {
    // This sets the buckets with empty arrays
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  hash(value) {
    // Same method as the one provided in the HashMap Lesson
    let hashCode = 0;
    let primeNumber = 31;

    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    };

    return hashCode;
  };

  getBucketIndex(key) {
    let hashKey = this.hash(key);
    return hashKey % this.buckets.length;
  };

  getBucketEntry(key) {
    let bucketIndex = this.getBucketIndex(key);

    if (!this.buckets[bucketIndex]) {
      this.buckets[bucketIndex] = [];
    };

    return (this.buckets[bucketIndex] || [])
      .find(entry => entry && entry[0] === key);
  };

  resize() {
    let newCapacity = this.buckets.length * 2;
    let newBuckets = new Array (newCapacity).fill(null).map(() => []);
    
    this.buckets.forEach(b => {
      b.forEach(k => {
        let index = this.hash(k[0]) % newCapacity;
        newBuckets[index].push([k[0]]);
      });
    });

    this.buckets = newBuckets;
  };

  set(key) {
    let bucketIndex = this.getBucketIndex(key);
    let bucketEntry = this.getBucketEntry(key);

    if (bucketEntry) {
      bucketEntry[0] = key;
    } else {
      this.buckets[bucketIndex].push([key]);
      this.size++;
    };

    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize();
    };
  };

  get(key) {
    let bucketEntry = this.getBucketEntry(key);
    return bucketEntry ? bucketEntry[0] : null;
  };

  has(key) {
    let bucketEntry = this.getBucketEntry(key);
    return bucketEntry ? true : false;
  };

  remove(key) {
    let bucketIndex = this.getBucketIndex(key);
    let bucketEntry = this.getBucketEntry(key);
    
    if (!bucketEntry) {
      return false;
    } else {
      this.buckets[bucketIndex] = [];
      this.size--;
    };
  };

  length() {
    return this.size;
  };

  clear() {
    this.buckets.forEach(b => {
      b.length = 0;
      this.size = 0;
    });
  };

  keys() {
    let keyArr = [];

    this.buckets.forEach(b => {
      keyArr.push(b[0]);
    });

    return keyArr;
  };

  entries() {
    let entriesArr = [];

    this.buckets.forEach(b => {
      entriesArr.push(b[0]);
    });

    return entriesArr;
  };
};
