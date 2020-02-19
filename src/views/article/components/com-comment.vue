   <template>
  <div class="comment">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!--注意：com_id是数组格式信息，需要调用toString()变为字符串，否则vue会报错-->
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
        <!-- 作者头像 -->
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <!-- 作者名称 -->
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <!-- 点赞 -->
        <div slot="default">
          <!-- 点赞
                :type="item.is_likeing?'danger':'default'"
                设置当前用户是否有点赞，设置不同 样式显示
                danger：红色
                default：无色
          -->
          <van-button
            icon="like-o"
            size="mini"
            plain
            type="item.is_liking?'danger':'default'"
          >&nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论内容和时间 -->
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | formatTime}}</span>
            ·
            <!--给回复按钮声明单击事件，传递评论id-->
            <span @click="openReply(item.com_id.toString())">{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>

    <!-- 弹出层 -->
    <!-- 回复列表展示-弹出层/瀑布 -->
    <van-popup v-model="showReply" position="bottom" :style="{ height: '80%' }" round>
      <!-- 瀑布加载效果 -->
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <!-- 对获得到的回复信息做遍历展示 -->
        <van-cell v-for="item11 in replyList" :key="item11.com_id.toString()">
          <!-- 作者头像 -->
          <div slot="icon">
            <img class="avatar" :src="item11.aut_photo" alt />
          </div>
          <!-- 作者名称 -->
          <div slot="title">
            <span>{{item11.aut_name}}</span>
          </div>
          <!-- 回复内容和时间 -->
          <div slot="label">
            <p v-html="item11.content"></p>
            <p>
              <span>{{item11.pubdate | formatTime}}</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
// 获取文章评论api
import { apiCommentList } from '../../../api/comment'

// 获取评论回复api
import { apiReplyList } from '../../../api/reply.js'
export default {
  name: 'com-comment',
  data () {
    return {
      // 瀑布流相关
      loading: false,
      finished: false,
      // 评论相关
      commentList: [], // 评论列表
      commentID: null, // 评论分页标志
      showReply: false, // 回复弹出层是否展示
      // 回复瀑布相关
      replyList: [], // 回复列表
      lastID: null, // 分页标志
      nowComID: '', // 点击激活的的评论的id
      // 回复瀑布相关
      reply: {
        list: [],
        loading: false,
        finished: false
      }
    }
  },
  //   获取文章id，方便使用
  computed: {
    aid () {
      return this.$route.params.aid
    }
  },
  methods: {
    // 单击回复标签，展示回复弹出层逻辑
    // 参数commentID是被激活的评论的id
    openReply (commentID) {
      this.nowComID = commentID

      this.showReply = true
      // 清除上一次的回复列表数据
      this.replyList = []
      // 激活瀑布
      this.reply.finished = false
      // 回复分页偏移量
      this.lastID = null
    },
    // 查看回复瀑布加载

    async onLoadReply () {
      // 暂停0.8秒
      await this.$sleep(800)

      // 获取指定评论对应的回复信息
      const result = await apiReplyList({
        commentID: this.nowComID,
        lastID: this.lastID
      })

      // 加载动画消失
      this.reply.loading = false

      // 数据加载完成
      if (result.results.length === 0) {
        this.reply.finished = true
        return false
      }
      this.replyList.push(...result.results)
      // 接收分页标志的last_id信息
      this.lastID = result.last_id
    },
    async onLoad () {
      // 暂停0.8秒
      await this.$sleep(800)

      // 获取评论列表
      const result = await apiCommentList({
        articleID: this.aid,
        commentID: this.commentID
      })
      // 加载动画消失
      this.loading = false

      // 数据加载完成
      if (result.results.length === 0) {
        this.finished = true // 瀑布停止
        return false
      }

      // 把数据追加给data
      this.commentList.push(...result.results)
      // 接收commentID
      this.commentID = result.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
}
</style>
