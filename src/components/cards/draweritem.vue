<template>
    <div class="drawitem">
        <div class="message">
            <div v-if="isShow">
                <div v-for="item in items" :key="item.userUrl">
                    <div class="user">
                        <div class="user-img">
                            <img :src="item.userUrl">
                        </div>
                        <el-avatar> user </el-avatar>
                    </div>
                    <div class="ai">
                        <el-avatar
                            style="border:1px solid rgb(226, 224, 224); background-color: #edf5ff; color:rgb(54, 124, 255)">
                            AI </el-avatar>
                        <div class="ai-img">
                            <p>下面是为您分析的结果：</p>
                            <img :src="item.aiUrl" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isShow2">
            </div>
        </div>

        <div class="btn">
            <el-upload ref="upload" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15t" :limit="1"
                :on-exceed="handleExceed" :auto-upload="false" :on-error="onUploadAfterRead" :file-list="items">
                <template #trigger>
                    <el-button class="choose-btn" @click="choosePic" type="primary" plain>选择图片</el-button>
                </template>
                <el-button class="up-btn" @click="submitUpload" type="success" plain>
                    发送
                </el-button>
                <template #tip>
                    <el-text type="warning">
                        一次只能选择一张图片
                    </el-text>
                </template>
            </el-upload>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const isShow = ref(false)
const isShow2 = ref(false)

let items = [
]
let newitem = { userUrl: '', aiUrl: '' }
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
    console.log(file);
    console.log("aaaa");
}

const choosePic = () => {
    isShow2.value = false;
    newitem = { userUrl: '', aiUrl: '' };
}
// 发送按钮点击事件
const submitUpload = (file: UploadFile) => {
    upload.value!.submit();
    console.log("文件名：",);
    console.log(upload.value);
}

const onUploadAfterRead = (res, file) => {
    // 将一组数据压入items数组，并刷新视图
    let filename = (file.name);
    newitem.userUrl = URL.createObjectURL(file.raw);
    if (filename == "紫荆山路-城北路.png")
    {
        newitem.aiUrl = ('/src/assets/event/a2.png')
    }
    else if (filename == "中原路-秦岭路.png")
    {
        newitem.aiUrl = ('/src/assets/event/b2.png')
    }
    else if (filename == "西流湖公园.png")
    {
        newitem.aiUrl = ('/src/assets/event/c2.png')
    }
    else{
        newitem.aiUrl=('/src/assets/event/correct.png');//这里放一个图，没有能匹配的就报错
    }
    items.push(newitem);
    isShow.value = true;
    isShow2.value = true;
    console.log(items)
}

</script>
<style>
    .drawitem{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .message {
        width: 100%;
        margin-bottom: 15%;
        height: 56vh;
        overflow: auto;
        padding-left:10px;
        padding-right: 10px;
    }
    .message::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    .message::-webkit-scrollbar-track {
        background-color:transparent;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius:2em;
    }
    .message::-webkit-scrollbar-thumb {
        background-color: rgb(147,147,153,0.5);
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius:2em;
    }
    .user {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 98%;
        /* margin-right: 10px; */
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .user-img {
        background-color: white;
        width: 13vw;
        height: auto;
        margin-right: 20px;
        border: 2px solid rgba(176, 225, 250, 0.318);
        border-radius: 10px;
        padding: 10px;
    }

    .user-img img {
        width: 100%;
        height: auto;
    }

    .ai {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 98%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .ai-img {
        background-color: white;
        padding: 10px;
        display: flex;
        flex-direction: column;
        width: 13vw;
        margin-left: 20px;
        border: 2px solid rgba(176, 225, 250, 0.318);
        border-radius: 10px;
    }

    .ai-img p {
        color: black;
    }

    .ai-img img {
        width: 100%;
        margin-top: 10px;
        height: auto;
    }

    .btn {
        width: 94%;
        height: 13%;
        border: 2px solid rgba(151, 208, 255, 0.5);
        border-radius: 10px;
        position: absolute;
        bottom: 10px;
        padding: 10px;
    }

    .choose-btn {
        margin-right: 20px;
        float: left;
    }

    .up-btn {
        margin-left: 20px;
        float: right;
    }
</style>