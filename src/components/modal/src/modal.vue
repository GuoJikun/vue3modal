<template>
    <teleport to="body">
        <div class="modal" v-show="modelValue" :style="{ zIndex: zIndex }">
            <div class="modal-mask" @click="maskClose"></div>
            <div class="modal-content" :style="{ width: width }">
                <div class="modal-header">
                    <slot name="header">{{ title }}</slot>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer" v-if="!footerHide">
                    <slot name="footer">
                        <button class="modal-button" @click="closeModal('cancel')">取消</button>
                        <button class="modal-button modal-button-primary" @click="sure">确定</button>
                    </slot>
                </div>
                <div class="modal-close" @click="closeModal('close')"></div>
            </div>
        </div>
    </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Modal",
    props: {
        modelValue: Boolean,
        title: String,
        footerHide: Boolean,
        width: {
            type: String,
            default: "500px",
        },
        maskClosable: {
            type: Boolean,
            default: true,
        },
        zIndex: {
            type: Number,
            default: 1000,
        },
    },
    emits: ["ok", "close", "update:modelValue"],
    setup(props, { emit }) {
        const closeModal = (type: string) => {
            emit("update:modelValue", false);
            emit("close", type);
        };
        const maskClose = () => {
            if (props.maskClosable) closeModal("close");
        };
        const sure = () => {
            emit("update:modelValue", false);
            emit("ok");
        };
        return { closeModal, sure, maskClose };
    },
});
</script>

<style lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    &-mask {
        width: 100vw;
        height: 100vh;
        background-color: rgba($color: #000000, $alpha: 0.4);
    }
    &-content {
        width: 500px;
        position: absolute;
        top: 8vh;
        left: 50%;
        margin-left: -250px;
        background-color: #fff;
        border-radius: 8px;
        z-index: 1;
        font-size: 14px;
    }
    &-header {
        padding: 12px 16px;
        border-bottom: 1px solid #e4e7ed;
    }
    &-footer {
        padding: 12px 16px;
        border-top: 1px solid #e4e7ed;
        text-align: right;
    }
    &-body {
        padding: 16px;
    }
    &-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            left: 8px;
            top: 0;
            width: 1px;
            height: 16px;
            background-color: #999;
            border-radius: 0.5px;
            transform: rotate(-45deg);
            z-index: -1;
        }
        &::before {
            transform: rotate(45deg);
        }
        &:hover::before,
        &:hover::after {
            background-color: #444;
        }
    }
    &-button {
        line-height: 1em;
        font-size: 14px;
        padding: 8px 20px;
        border: 1px solid #dcdfe6;
        outline: none;
        display: inline-block;
        border-radius: 4px;
        cursor: pointer;
        background-color: #fff;
        transition: 0.1s;
        &:hover {
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
        & + & {
            margin-left: 10px;
        }

        &-primary {
            background-color: #2d8cf0;
            border-color: #2d8cf0;
            color: white;
            &:hover {
                background: #66b1ff;
                border-color: #66b1ff;
                color: #fff;
            }
        }
    }
}
</style>
