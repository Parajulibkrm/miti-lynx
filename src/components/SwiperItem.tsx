function SwiperItem({ pic, itemWidth }: { pic: string; itemWidth: number }) {
	return (
		<view
			class="swiper-item"
			style={{ width: `${itemWidth}px`, height: "100%" }}
		>
			<image
				mode="aspectFill"
				src={pic}
				style={{ width: "100%", height: "100%" }}
			/>
		</view>
	);
}
export { SwiperItem };
