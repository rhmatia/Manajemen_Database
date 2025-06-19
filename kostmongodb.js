// database
use KostMahasiswa;

// Collection
db.createCollection("kost");

// Create Dokumen
db.kost.insertOne({
  nama: "Kos Mawar",
  alamat: "Jl. Melati No.10",
  harga: 800000,
  fasilitas: ["WiFi", "Kamar Mandi Dalam", "AC"],
  tersedia: true,
  gender: "perempuan"
})

// Read Dokumen
db.kost.find()

db.kost.find({}, {nama : 1})

// Update Dokumen
db.kost.updateOne({nama: "Kos Mawar"},{$set:{harga: 500000}})

// Delete Dokumen
db.kost.deleteOne({nama: "Kos Mawar"})

// Bulk Write Dokumen
db.kost.bulkWrite([
  {
    insertOne: {
      document: {
        nama: "Kos Anggrek",
        alamat: "Jl. Cemara No.9",
        harga: 700000,
        fasilitas: ["Kipas Angin", "WiFi"],
        tersedia: true,
        gender: "perempuan"
      }
    }
  },
  {
    insertOne: {
      document: {
        nama: "Kos Bougenville",
        alamat: "Jl. Cempaka No.3",
        harga: 750000,
        fasilitas: ["AC", "Kamar Mandi Dalam"],
        tersedia: true,
        gender: "laki-laki"
      }
    }
  },
  {
    insertOne: {
      document: {
        nama: "Kos Teratai",
        alamat: "Jl. Flamboyan No.8",
        harga: 680000,
        fasilitas: ["WiFi", "Lemari", "Kasur"],
        tersedia: false,
        gender: "perempuan"
      }
    }
  },
  {
    insertOne: {
      document: {
        nama: "Kos Melur",
        alamat: "Jl. Kemuning No.12",
        harga: 720000,
        fasilitas: ["Kamar Mandi Dalam", "AC", "WiFi"],
        tersedia: true,
        gender: "laki-laki"
      }
    }
  },
  {
    insertOne: {
      document: {
        nama: "Kos Kamboja",
        alamat: "Jl. Nusa Indah No.15",
        harga: 690000,
        fasilitas: ["WiFi", "Kipas Angin"],
        tersedia: true,
        gender: "perempuan"
      }
    }
  }
])

db.kost.find({fasilitas: { $in: ["WiFi", "Kamar Mandi Dalam"] }})

// Logical Query (AND)
db.kost.find({
  $and: [
    {gender: "perempuan"},
    {fasilitas: "WiFi"}
  ]
})

// Aggregation
db.kost.aggregate([
  {
    $group: {
      _id: "$gender",
      jumlah_kos: { $sum: 1 },
      rata_rata_harga: { $avg: "$harga" }
    }
  }
])

//Schema Validation
db.createCollection("kost_valid", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nama", "harga", "gender"],
      properties: {
        nama: {
          bsonType: "string",
          description: "Harus berupa string dan wajib"
        },
        alamat: {
          bsonType: "string",
          description: "Harus berupa string"
        },
        harga: {
          bsonType: "int",
          minimum: 0,
          description: "Harus bilangan bulat dan wajib"
        },
        fasilitas: {
          bsonType: ["array"],
          items: {
            bsonType: "string"
          },
          description: "Harus berupa array string"
        },
        tersedia: {
          bsonType: "bool",
          description: "Harus true/false"
        },
        gender: {
          enum: ["laki-laki", "perempuan"],
          description: "Hanya boleh 'laki-laki' atau 'perempuan'"
        }
      }
    }
  },
  validationAction: "error" // Jika tidak valid, maka akan error
})

// Insert tidak Valid
db.kost_valid.insertOne({
  nama: "Kos Gagal",
  harga: "850000",  // ❌ salah: harga bukan int
  gender: "campur"  // ❌ salah: bukan 'laki-laki' atau 'perempuan'
})

// Insert Valid
db.kost_valid.insertOne({
  nama: "Kos Sakura",
  alamat: "Jl. Sakura No.1",
  harga: 850000,
  fasilitas: ["WiFi", "AC"],
  tersedia: true,
  gender: "perempuan"
})
