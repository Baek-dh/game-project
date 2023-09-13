package my.bdh.game.wf.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import my.bdh.game.wf.model.dto.Player;
import my.bdh.game.wf.model.mapper.WhosFasterMapper;

@Transactional
@Service
public class WhosFasterServiceImpl implements WhosFasterService{
	
	@Autowired
	private WhosFasterMapper mapper;

	@Override
	public int insertRecord(Player player) {
		return mapper.insertRecord(player);
	}
	
	@Override
	public List<Player> selectRank(String difficulty) {
		return mapper.selectRank(difficulty);
	}

}
