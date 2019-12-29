// 过滤博客数据
export function filterPosts(posts, isTimeline) {
    posts = posts.filter(item => {
        const { title, frontmatter: { home, date, private: isPrivate } } = item;
        return isTimeline === true
            ? !(home === true || title === undefined || date === undefined || isPrivate !== true)
            : !(home === true || title === undefined || isPrivate !== true);
    });
    return posts;
}

// 排序博客数据
export function sortPostsByStickyAndDate(posts) {
    posts.sort((prev, next) => {
        const prevSticky = prev.frontmatter.sticky;
        const nextSticky = next.frontmatter.sticky;
        if (prevSticky && nextSticky) {
            return prevSticky === nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky);
        } else if (prevSticky && !nextSticky) {
            return -1;
        } else if (!prevSticky && nextSticky) {
            return 1;
        }
        return compareDate(prev, next);
    });
}

export function sortPostsByDate(posts) {
    return posts.sort((prev, next) => {
        return compareDate(prev, next);
    });
}

// 比对时间
export function compareDate(a, b) {
    return getTimeNum(b) - getTimeNum(a);
}

// 获取时间的数字类型
export function getTimeNum(date) {
    return new Date(date.frontmatter.date).getTime();
}
