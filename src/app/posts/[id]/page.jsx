import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
     
// dangerouslySetInnerHTML={{ __html: data?.desc }}

const SinglePage = async ({ params }) => {
  
  const { id} = params;

  const data = await getData(id);
  
  

  return (

    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {/* {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src="noavatar.png" alt="" fill className={styles.avatar} />
              </div>
            )} */}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Ibraa</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
           
          />
               <p>{data?.desc}</p>
               
          <div className={styles.comment}>
            {/* <Comments postSlug={slug}/> */}
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
