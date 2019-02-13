const withDialog = (Component) => {
  console.log('fff', props);
  return (
    <div className="popup-win">
      <Component {...props} />
      <div className="popup-win_btn">
        <a href="javascript:;" onClick={() => {}}>保存</a>
      </div>
    </div>
  )
}

export default withDialog;