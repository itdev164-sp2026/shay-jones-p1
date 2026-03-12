import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const BlogContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
`

const BlogTitle = styled.h2`
  color: purple;
`

const PostCard = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`

const IndexPage = ({ data }) => {
  const posts = data.allContentfulBlogPost.nodes

  return (
    <Layout>
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />

        <h1>Welcome to Shay's Blog</h1>
        <p>This site pulls blog posts from Contentful CMS.</p>
      </div>

      <BlogContainer>
        <BlogTitle>Blog Posts</BlogTitle>

        {posts.map(post => (
          <PostCard key={post.slug}>
            <h3>{post.title}</h3>
            <p>{post.slug}</p>
          </PostCard>
        ))}
      </BlogContainer>
    </Layout>
  )
}
export const query = graphql`
  query {
    allContentfulBlogPost {
      nodes {
        title
        slug
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage
