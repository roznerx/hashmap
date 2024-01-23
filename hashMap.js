class HashMap {
  constructor (initialCapacity, loadFactor) {
    this.buckets = new Array(initialCapacity);
    this.size = 0;
  }

  hash(value) {
    let hashCode = 0;
    let primeNumber = 31;

    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    };

    return hashCode;
  };

  set(key, value) {

    if (!this.buckets) {
      console.log("Buckets are not properly initialized.");
      return;
    };

    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.buckets.length;

    let bucketEntry = (this.buckets[bucketIndex]).find(entry => entry[0] === key);

    if (bucketEntry) {
      bucketEntry[1] = value;
    } else {
      this.buckets[bucketIndex].push([key, value]);
      this.size++;
    };

    // Should add a condition for resize if loadFactor is reached
    // Something like

    if (this.size / this.buckets.length > this.loadFactor) {
      //resize bucket?
    }

  };
};

