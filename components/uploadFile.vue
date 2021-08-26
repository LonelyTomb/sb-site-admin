<template>
  <div class="image-input-wrapper">
    <div class="image-input flex items-center">
      <b-form-group
        id="location-images"
        label="Upload Images:"
        label-for="location-images"
      >
        <input
          id="location-images"
          type="file"
          name="image"
          accept="image/*"
          placeholder="Choose a file or drop it here..."
          @change="uploadFile($event.target.files[0], 'sabreworks')"
        />
        <p v-if="uploading">Uploading: {{ value }}</p>
      </b-form-group>
    </div>
    <div v-if="urls.length" class="image-input flex items-center">
      <p>Images</p>
      <div v-for="image in urls" :key="image" class="thumb">
        <img :src="image" alt="" class="upload-image" />
        <button
          class="delete-upload-image"
          type="button"
          @click.prevent="removeFromUrl(image)"
        >
          <b-img src="~svg/delete.svg" alt="" class="" fluid />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as S3 from 'aws-sdk/clients/s3'

export default {
  name: 'UploadInput',
  props: {
    form: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    images: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      temp: '',
      uploading: null,
      value: null,
      uploadColor: null,
      exist: false,
      uploadUrl: null,
      urls: [],
    }
  },
  watch: {
    images(val) {
      if (val.length) {
        this.urls = val
      }
    },
  },
  mounted() {
    this.uploadUrl = this.url
    this.urls = this.images
  },
  methods: {
    removeFromUrl(item) {
      this.urls = this.urls.filter((img) => img !== item)
    },
    async uploadFile(file, FOLDER) {
      await new Promise((resolve, reject) => {
        const loader = this.$loading.show()
        const contentType = file.type
        const timestampprefix = new Date().getTime()
        const bucket = new S3({
          accessKeyId: process.env.APP_AWS_ID,
          secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
          region: 'us-east-1',
        })

        const params = {
          Bucket: process.env.APP_AWS_BUCKET,
          Key: `${FOLDER}/${this.form.name}/${timestampprefix}${file.name}`,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType,
        }
        bucket
          .upload(params)
          .on('httpUploadProgress', (evt) => {
            this.uploading = true
            this.value = Math.ceil((evt.loaded / evt.total) * 100)
          })
          .send((err, data) => {
            loader.hide()
            this.uploading = false
            this.exist = true
            if (err) {
              reject(err)
            }
            this.uploadColor = 'success'
            this.uploadUrl = data.Location
            this.urls.push(data.Location)
            resolve(data)
          })
      })

      this.$emit('completed', this.urls)
    },
  },
}
</script>

<style scoped lang="scss">
.image-input-wrapper {
  & > p {
    margin-bottom: 1rem;
  }
  & > div {
    margin-bottom: 1rem;
  }
  .thumb {
    position: relative;
    display: inline-block;
  }
  .upload-image {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
  .delete-upload-image {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    padding: 0;
    display: inline-flex;
    position: absolute;
    right: 0;
    img {
      width: 100%;
    }
  }
}
</style>
