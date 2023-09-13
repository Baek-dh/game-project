package my.bdh.game.wf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import my.bdh.game.wf.model.dto.Player;
import my.bdh.game.wf.model.service.WhosFasterService;

@RequestMapping("faster")
@RestController
@Slf4j
public class WhosFasterController {

	@Autowired
	private WhosFasterService service;
	
	/** 기록 등록*/
	@PostMapping("insert")
	public int insertRecord(@RequestBody Player player) {
		return service.insertRecord(player);
	}
	
	@GetMapping(value="selectRank", produces="application/json; charset=UTF-8" )
	public List<Player> selectRank(String difficulty){
		return service.selectRank(difficulty);
	}
}
