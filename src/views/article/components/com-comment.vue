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
            <span>{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 获取文章评论api
import { apiCommentList } from '../../../api/comment'

export default {
  name: 'com-comment',
  data () {
    return {
      // 瀑布流相关
      loading: false,
      finished: false,
      // 评论相关
      commentList: [], // 评论列表
      commentID: null // 评论分页标志
    }
  },
  //   获取文章id，方便使用
  computed: {
    aid () {
      return this.$route.params.aid
    }
  },
  methods: {
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
