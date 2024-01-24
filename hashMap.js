class HashMap {
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
      b.forEach(be => {
        let [key, value] = be;
        let beIndex = this.hash(key) % newCapacity;
        newBuckets[beIndex].push([key, value]);
      })
    });

    this.buckets = newBuckets;
  };

  set(key, value) {
    let bucketEntry = this.getBucketEntry(key);

    if (bucketEntry) {
      bucketEntry[1] = value;
    } else {
      this.buckets[bucketIndex].push([key, value]);
      this.size++;
    };

    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize();
    };
  };

  get(key) {
    let bucketEntry = this.getBucketEntry(key);
    return bucketEntry ? bucketEntry[1] : null;
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
      this.buckets[bucketIndex].length = 0;
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
      b.forEach(e => {
        keyArr.push(e[0]);
      });
    });

    return keyArr;
  };

  values() {
    let valueArr = [];

    this.buckets.forEach(b => {
      b.forEach(e => {
        valueArr.push(e[1]);
      });
    });

    return valueArr;
  };

  entries() {
    let entriesArr = [];

    this.buckets.forEach(b => {
      b.forEach(e => {
        entriesArr.push(e);
      });
    });

    return entriesArr;
  };
};

const myHashMap = new HashMap(16, 0.75);
myHashMap.set("name", "Jake");
myHashMap.set("age", 34);
myHashMap.set("city", "Nevada");
myHashMap.set("country", "USA");
myHashMap.set("occupation", "Developer");
myHashMap.set("guitar", "Les Paul");
myHashMap.set("bass", "Fender");
myHashMap.set("drums", "Tama");
myHashMap.set("faveBand", "Converge");
myHashMap.set("faveFilm", "Point Break");
myHashMap.set("faveBook", "The DaVinci Code");
myHashMap.set("faveActor", "Paul Giamatti");
myHashMap.set("faveActress", "Margot Robbie");
myHashMap.set("celebCrush", "Hunter Schafer");
myHashMap.set("faveVideoGame", "Doom");
myHashMap.set("faveAlbum", "Toxicity");
myHashMap.set("faveFood", "Pizza");
myHashMap.set("faveTvShow", "True Detective");
myHashMap.set("faveSport", "Basketball");
myHashMap.set("faveTeam", "LA Clippers");
myHashMap.set("favePlayer", "Allen Iverson");
console.log(myHashMap);
console.log(myHashMap.buckets.length);
console.log(myHashMap.size);
console.log(myHashMap.get("faveVideoGame"))
myHashMap.remove("faveVideoGame");
console.log(myHashMap);
console.log(myHashMap.length());
//myHashMap.clear();
console.log(myHashMap);
console.log(myHashMap.keys());
console.log(myHashMap.values());
console.log(myHashMap.entries());
